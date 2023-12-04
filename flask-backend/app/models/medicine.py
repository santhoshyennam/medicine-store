from app import db
from .base import Base
from .image import Image
class Medicine(Base):
    __tablename__ = 'medicine'
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    price = db.Column(db.String(20), nullable=False)
    discount = db.Column(db.String(20), nullable=False)
    medicine_category_id = db.Column(db.Integer, db.ForeignKey('medicine_categories.id'), nullable=False)
    medicine_inventory_id = db.Column(db.Integer, db.ForeignKey('medicine_inventory.id'), nullable=False)
    manufacture_id = db.Column(db.Integer, db.ForeignKey('manufacture.id'), nullable=False)
    dose_id =db.Column(db.Integer, db.ForeignKey('dose.id'), nullable=False)
    prescription_status =  db.Column(db.String(200))
    category = db.relationship('MedicineCategory', backref='category', uselist=False)
    inventory = db.relationship('MedicineInventory', backref='inventory', uselist=False)
    dose = db.relationship('Dose', backref='dose', uselist=False)
    images = db.relationship("Image", lazy=True, primaryjoin="Medicine.id == Image.medicine_id")
    manufactureDetails = db.relationship("Manufacture", lazy=True, primaryjoin="Medicine.manufacture_id == Manufacture.id")

    def to_dict(self):
        parent_dict = super().to_dict()
        child_dict = {
            'name': self.name,
            'price': self.price,
            'discount': self.discount,
            'description': self.description,
            # 'medicine_category_id': self.medicine_category_id,
            # 'medicine_inventory_id': self.medicine_inventory_id,
            # 'manufacture_id': self.manufacture_id,
            # 'dose_id': self.discount,
            'prescription_status': self.prescription_status,
            # 'category': self.category.to_dict(),
            # 'inventory': self.inventory.to_dict(),
            'dose': self.dose.get_required_data(),
            'images': [image.get_required_data() for image in self.images],
            'manufactureDetails': self.manufactureDetails.get_required_data()
        }
        return {**parent_dict, **child_dict}


