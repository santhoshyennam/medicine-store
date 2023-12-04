from app import db
from .base import Base

class MedicineCategory(Base):
    __tablename__ = 'medicine_categories'
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    image_url = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'name': self.name,
            'image_url': str(self.image_url),
            'description': self.description,
        }
        return {**parent_dict, **child_dict}


