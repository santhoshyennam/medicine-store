import datetime
from app import db

class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime,nullable=False, default=datetime.datetime.utcnow)
    last_updated_date = db.Column(db.DateTime,nullable=False,default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "date_created": str(self.date_created),
            "last_updated_date": str(self.last_updated_date)
        }
