

function UpdateUser() {
  return (
    <div class="card">
      <form>
        <div class="card-body">
          <div class="form-group">
            <img
              src="https://fptshop.com.vn/Content/v5d/account/images/img-user.png"
              className="card-img-top w-25 h-25"
              alt="User Image"
              style={{ width: "5rem" }}
            />
            <input type="file" class="form-control-file" />
          </div>
          <div class="form-group">
            <label for="name">Name:</label>
            <input name="name" class="form-control" placeholder="" />
          </div>
          <div class="form-group">
            <label for="age">Age:</label>
            <input type="number" class="form-control" placeholder="" />
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input type="phone" class="form-control" placeholder="" />
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input type="text" class="form-control" placeholder="" />
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>

  )
}

export default UpdateUser