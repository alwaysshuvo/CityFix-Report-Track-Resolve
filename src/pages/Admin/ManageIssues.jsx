const ManageIssues = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Issues</h1>

      <div className="overflow-x-auto bg-base-200 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Broken Road</td>
              <td>Road</td>
              <td>
                <span className="badge badge-warning">Pending</span>
              </td>
              <td>
                <span className="badge badge-error">High</span>
              </td>
              <td>
                <button className="btn btn-sm btn-primary">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageIssues;
