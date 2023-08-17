

export default function EditProfile() {
    return (
        <>
            <div>
                <p className="fw-bold mt-3" style={{ fontSize: "20 px" }}>Photo & Prompts</p>




            </div>
            <div>
                <p className="fw-bold mt-3" style={{ fontSize: "20 px" }}>Your Intro</p>
                <div className="md-form mb-4 pink-textarea active-pink-textarea">
                    <i className="fas fa-angle-double-right prefix" />
                    <textarea
                        id="form21"
                        className="md-textarea form-control"
                        rows={3}
                        defaultValue={""}
                        placeholder=""
                    />
                    <label htmlFor="form21">
                        Material textarea with a colorful prefix on :focus state
                    </label>
                </div>


            </div>
            <div>
                <p className="fw-bold" style={{ fontSize: "20px" }}>Your Basics</p>
                <ul className="list-group">
                    <li className="list-group-item d-flex align-items-center">
                        <span className="icon me-3 ">
                            <i className="fas fa-user"></i>
                        </span>
                        <div className="flex-fill">
                            <div className="fw-bold">First Name</div>
                            <div className="text-muted">User2</div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="icon me-3">
                            <i className="fas fa-birthday-cake"></i>
                        </span>
                        <div className="flex-fill">
                            <div className="fw-bold">Age</div>
                            <div className="text-muted">33</div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="icon me-3">
                            <i className="fas fa-map-marker-alt"></i>
                        </span>
                        <div className="flex-fill">
                            <div className="fw-bold">Dating Location</div>
                            <div className="text-muted">Cầu Giấy</div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="icon me-3">
                            <i className="fas fa-venus-mars"></i>
                        </span>
                        <div className="flex-fill">
                            <div className="fw-bold">Gender</div>
                            <div className="text-muted">Man (not visible)</div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="icon me-3">
                            <i className="fas fa-heart"></i>
                        </span>
                        <div className="flex-fill">
                            <div className="fw-bold">Looking For</div>
                            <div className="text-muted">Something Casual</div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="icon me-3">
                            <i className="fas fa-ruler-vertical"></i>
                        </span>
                        <div className="flex-fill">
                            <div className="fw-bold">Height</div>
                            <div className="text-muted">170 cm tall</div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center">
                        <span className="icon me-3">
                            <i className="fas fa-home"></i>
                        </span>
                        <div className="flex-fill">
                            <div className="fw-bold">Hometown</div>
                            <div className="text-muted">Hà Đông, Hà Nội, Việt Nam</div>
                        </div>
                    </li>
                </ul>

            </div>
            <div>
                <p className="fw-bold mt-3" style={{ fontSize: "20 px" }}>Your Work and Education</p>
                <ul className="list-group ">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-bold">Education Levels</div>
                            <div className="text-muted">No preference</div>
                        </div>
                    </li>
                </ul>

            </div>

        </>

    )
}