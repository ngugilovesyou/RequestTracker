from config import db

class Request(db.Model):
    __tablename__ = 'requests'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    product_company = db.Column(db.String(100), nullable=False)
    request_type = db.Column(db.String(50), nullable=False)
    priority = db.Column(db.String(20), nullable=False, default='Medium')
    message = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False, default='New')

    def __repr__(self):
        return f'<Task {self.username} - {self.request_type}>'

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "product_company": self.product_company,
            "request_type": self.request_type,
            "priority": self.priority,
            "message": self.message,
            "status": self.status,
        }    