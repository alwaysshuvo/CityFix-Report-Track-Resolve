const AssignedIssues = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Assigned Issues</h1>

      <div className="bg-base-200 rounded-xl shadow overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Broken Street Light</td>
              <td>
                <span className="badge badge-info">In Progress</span>
              </td>
              <td>
                <span className="badge badge-error">High</span>
              </td>
              <td>
                <select className="select select-sm">
                  <option>In Progress</option>
                  <option>Working</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedIssues;
