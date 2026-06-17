from models import Request as Task
from flask import Flask,request, jsonify
from config import init_app, db

app = Flask(__name__)

init_app(app)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/tasks', methods=['GET'])
def get_tasks():
    status = request.args.get('status')

    try:
        query = Task.query

        if status:
            query = query.filter_by(status=status)

        tasks = query.order_by(Task.id.desc()).all()

        return jsonify({
            "tasks": [task.to_dict() for task in tasks]
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    

@app.route('/create_tasks', methods=['POST'])
def create_task():
    data = request.get_json()

    try:
        new_task = Task(
            username=data['username'],
            email=data['email'],
            product_company=data['product_company'],
            request_type=data['request_type'],
            priority=data.get('priority', 'Medium'),
            message=data.get('message', ''),
            status=data.get('status', 'New')
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"message": "Task created successfully", "task": new_task.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/update/<int:task_id>/status', methods=['PUT'])
def update_task_status(task_id):
    data = request.get_json()
    new_status = data.get('status')

    if not new_status:
        return jsonify({"error": "Status is required"}), 400

    try:
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404

        task.status = new_status
        db.session.commit()
        return jsonify({"message": "Task status updated successfully", "task": task.to_dict()})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/delete/<int:task_id>/task', methods=['DELETE'])
def delete_task(task_id):
    try:
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404

        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)