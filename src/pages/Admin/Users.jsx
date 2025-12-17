const Users = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-base-200 rounded-xl shadow overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Ali Shuvo</td>
              <td>ali@email.com</td>
              <td>
                <span className="badge badge-info">User</span>
              </td>
              <td>
                <button className="btn btn-sm btn-outline">
                  Make Admin
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
