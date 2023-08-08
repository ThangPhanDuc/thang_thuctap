from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import cv2
import numpy as np
import face_recognition
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Thanggmail25@localhost/laravel_3'
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    img = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), nullable=True)

# Load ảnh từ thư mục pic2 và mã hóa khuôn mặt
path = "uploads"
images = []
classNames = []
myList = os.listdir(path)
for cl in myList:
    curImg = cv2.imread(f"{path}/{cl}")
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])


def encode_known_faces(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList


encodeListKnow = encode_known_faces(images)

@app.route('/recognize', methods=['POST'])
def recognize():
    image = request.files['image'].read()
    frame = cv2.imdecode(np.frombuffer(image, np.uint8), -1)
    frameS = cv2.resize(frame, (int(frame.shape[1] * 0.5), int(frame.shape[0] * 0.5)))
    frameS = cv2.cvtColor(frameS, cv2.COLOR_BGR2RGB)

    facecurFrame = face_recognition.face_locations(frameS)
    encodecurFrame = face_recognition.face_encodings(frameS)

    results = []

    for encodeFace, faceLoc in zip(encodecurFrame, facecurFrame):
        matches = face_recognition.compare_faces(encodeListKnow, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnow, encodeFace)
        matchIndex = np.argmin(faceDis)

        if faceDis[matchIndex] < 0.6:
            img_name = f'uploads/{classNames[matchIndex]}.png'
            user = User.query.filter_by(img=img_name).first()
            if user:
                result = {
                    'id': user.id,
                    'name': user.name,
                    'img': user.img,
                    'email': user.email
                }
            else:
                result = {
                    'id': None,
                    'name': 'Unknown',
                    'img': None
                }
        else:
            result = {
                'id': None,
                'name': 'Unknown',
                'img': None
            }

        results.append(result)

        y1, x2, y2, x1 = faceLoc
        y1, x2, y2, x1 = y1 * 2, x2 * 2, y2 * 2, x1 * 2
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(frame, result['name'], (x2, y2), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)
