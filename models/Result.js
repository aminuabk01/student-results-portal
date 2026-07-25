<!DOCTYPE html>
<html>
<head>
  <title>Results - <%= student.name %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <nav>
    <span>Admin Panel</span>
    <div><a href="/admin/dashboard">Dashboard</a><a href="/logout">Logout</a></div>
  </nav>
  <div class="container">
    <div class="card">
      <h1><%= student.name %>'s Results</h1>
      <p><%= student.regNumber %> | <%= student.department || '-' %> | <%= student.level || '-' %></p>
      <a class="btn" href="/admin/results/new/<%= student._id %>">+ Add Result</a>
      <a class="btn" href="/admin/students">Back to Students</a>
      <table>
        <tr><th>Session</th><th>Term</th><th>Course</th><th>Score</th><th>Grade</th><th>Actions</th></tr>
        <% results.forEach(r => { %>
        <tr>
          <td><%= r.session %></td>
          <td><%= r.term %></td>
          <td><%= r.courseCode %> - <%= r.courseTitle %></td>
          <td><%= r.score %></td>
          <td><%= r.grade %></td>
          <td>
            <a class="btn btn-sm" href="/admin/results/<%= r._id %>/edit">Edit</a>
            <form style="display:inline" method="POST" action="/admin/results/<%= r._id %>?_method=DELETE" onsubmit="return confirm('Delete this result?')">
              <button class="btn btn-sm btn-danger" type="submit">Delete</button>
            </form>
          </td>
        </tr>
        <% }) %>
      </table>
    </div>
  </div>
</body>
</html>
