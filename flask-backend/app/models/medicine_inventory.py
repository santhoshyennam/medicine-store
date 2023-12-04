from app import db
from .base import Base
class MedicineInventory(Base):
    __tablename__ = 'medicine_inventory'
    medicine_short_name = db.Column(db.String(20), nullable=False)
    current_quantity = db.Column(db.String(10), nullable=False)

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'medicine_short_name': self.medicine_short_name,
            'current_quantity': self.current_quantity,
        }
        return {**parent_dict, **child_dict}


