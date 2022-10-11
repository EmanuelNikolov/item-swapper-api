const fs = require('fs');
const fileDb = __dirname + '/../database/items.json';

class ItemsRepository {
    constructor(db) {
        const file = fs.readFileSync(db);
        this.db = JSON.parse(file);
    }
    
    findAll() {
        return this.db.sort((a, b) => {
            if (a.order < b.order) return -1;
            if (a.order > b.order) return 1;
            return 0;
        });
    }
    
    findOne(id) {
        return this.db.find(item => item.id === id);
    }
    
    persist(updatedItem) {
        const itemIndex = this.db.findIndex(item => item.id === updatedItem.id);
        
        this.db[itemIndex] = updatedItem;
        fs.writeFileSync(fileDb, JSON.stringify(this.db));
    }
}

module.exports = new ItemsRepository(fileDb);