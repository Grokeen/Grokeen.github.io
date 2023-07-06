

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>스크립트 연습</title>
</head>
<body>
    <%@ page import="java.io.File" %>
    <%
  String directoryPath = request.getParameter("directoryPath");

  File directory = new File(directoryPath);
  String[] files = directory.list();
  int count = 0;

  for (String file : files) {
    if (file.endsWith(".md")) {
      count++;
    }
  }

  response.setContentType("text/plain");
  response.setCharacterEncoding("UTF-8");
  response.getWriter().write(String.valueOf(count));
%>
</body>
</html>
