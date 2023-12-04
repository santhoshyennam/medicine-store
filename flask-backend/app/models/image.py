from app import db
from .base import Base

class Image(Base):
    __tablename__ = 'images'
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    medicine_id = db.Column(db.Integer, db.ForeignKey('medicine.id'), nullable=False)

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'name': self.name,
            'url': str(self.url),
            'medicine_id': self.medicine_id,
        }
        return {**parent_dict, **child_dict}
    
    def get_required_data(self):
        dict = {
            'url': str(self.url)
        }
        return dict


