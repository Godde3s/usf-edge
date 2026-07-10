export function getFakePageHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to nginx!</title>
<style>
body{width:35em;margin:0 auto;font-family:Tahoma,Verdana,Arial,sans-serif}
h1{background:#8e44ad;color:#fff;padding:10px 20px;border-radius:6px 6px 0 0;margin:0}
p{padding:20px;background:#f9f9f9;border:1px solid #ddd;border-top:none;border-radius:0 0 6px 6px;margin:0;line-height:1.7;color:#333}
a{color:#2980b9;text-decoration:none}
a:hover{text-decoration:underline}
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working. Further configuration is required.</p>
<p><em>Thank you for using nginx.</em></p>
</body>
</html>`;
}