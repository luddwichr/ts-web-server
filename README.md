## Sample requests
- Valid request payload: `curl -X POST -H "Content-Type: application/json" -d '{"x":1, "y":2, "z": 3}' http://localhost:8080/validate`
- Invalid request payload: `curl -X POST -H "Content-Type: application/json" -d '{"x":1, "y":"test", "other": false}' http://localhost:8080/validate`
