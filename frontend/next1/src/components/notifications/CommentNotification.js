
import Link from 'next/link'

export default function CommentNotification(props) {
    const { notification } = props;
    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src={"http://localhost:8000/" + notification.data.userComment.img}
                        alt=""
                        style={{ width: 45, height: 45 }}
                        className="rounded-circle"
                    />
                    <Link href={"/post/" + notification.data.post_id}>
                        <div className="ms-3">
                            <p className="fw-bold mb-1">{notification.data.userComment.name}</p>
                            <p className="text-muted mb-0">{notification.data.userComment.name} commented on your post: {notification.data.content}</p>
                        </div>
                    </Link>
                </div>
            </li>
        </>

    )
}