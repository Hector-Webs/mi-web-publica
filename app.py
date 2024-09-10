from http.server import SimpleHTTPRequestHandler, HTTPServer
import json

class MyHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/datos':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            # Imprimir los datos en la terminal
            print(f"Nombre: {data['nombre']}, Contraseña: {data['contrasena']}, Cantidad: {data['cantidad']}")

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'success'}).encode())

# Configuración del servidor
def run(server_class=HTTPServer, handler_class=MyHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Servidor en funcionamiento en http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
