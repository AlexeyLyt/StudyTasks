<template>
  <div class="shopping-list">
      <div class="header">
            <h1>{{ header.toLocaleUpperCase() }}</h1>
            <button v-if="state === 'default'" class="btn btn-primary" @click="changeState('edit')">Add Item</button>
            <button v-else class="btn btn-cancel" @click="changeState('default')">Cancel Adding Item</button>
        </div>
        <div v-if="state === 'edit'" class="add-item-form">
            <input v-model="newItem" type="text" placeholder="Add an item" @keyup.enter="saveItem">
            <button class="btn btn-primary" :disabled="newItem.length === 0" @click="saveItem">Save Item</button>
        </div>
        <ul>
            <li v-for="(item, idx) in reversedItems" :key="idx" :class="{strikeout: item.purchased}" @click="togglePurchased(item)">{{ item.label }}</li>
        </ul>
        <p v-if="items.length === 0">Nice job! You've bought all your items.</p>
  </div>
</template>

<script>
export default {
  name: 'shopping-list',
  data () {
      return {
    state: 'default',
    header: 'shopping list app',
    newItem: '',
    items: [
        {
            label: '10 party hats',
            purchased: false,
            highPriority: false,
        },
        {
            label: '2 board games',
            purchased: true,
            highPriority: false,
        },
        {
            label: '20 cups',
            purchased: false,
            highPriority: false,
        }
    ]
    }
  },
    computed: {
    reversedItems() {
        return this.items.slice(0).reverse();
    }
    },
    methods: {
    saveItem: function() {
        this.items.push({
            label: this.newItem,
            purchased: false,
        });
        this.newItem = '';
    },
    changeState: function(newState) {
        this.state = newState;
        this.newItem = '';
    },
    togglePurchased: function(item) {
        item.purchased = !item.purchased;
    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.shopping-list {
    background: #FFF;
    padding: 2rem;
    margin: 1rem;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08);
    width: 95%;
    max-width: 900px;
}

h1 {
    color: #3D4852;
}

ul {
    list-style: none;
    padding: 0;
}

a:hover {
    color: #3490DC;
}

li, p {
    display: flex;
    align-items: center;
    line-height: 1.75;
    letter-spacing: .5px;
    color: #3D4852;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all .1s ease-in;
}

li:hover {
    color: #22292F;
}

li input {
    margin: 0 .5rem 0;
}

#shopping-list > input, #shopping-list > select {
    width: 100%;
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    border: 1px solid #F1F5F8;
    color: #606F7B;
    padding: .5rem .75rem;
    box-sizing: border-box;
    font-size: 1rem;
    letter-spacing: .5px;
    margin: .5rem 0
}

.add-item-form, .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.add-item-form input {
    width: 70%;
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
    border: 1px solid #F1F5F8;
    color: #606F7B;
    padding: .5rem .75rem;
    box-sizing: border-box;
    font-size: 1rem;
    letter-spacing: .5px;
    margin: .5rem 0;
}

.btn {
    border: none;
    border-radius: 3px;
    margin: auto 0;
    padding: .5rem .75rem;
    flex-shrink: 0;
    cursor: pointer;
    font-size: .9rem;
    letter-spacing: .5px;
    transition: all .1s ease-in;
}

.btn[disabled] {
    background: #8795A1;
}

.btn[disabled]:hover {
    background: #606F7B;
}

.btn-primary {
    background: #6CB2EB;
    color: #fff;
}

.btn-primary:hover {
    background: #3490DC;
}

.btn-cancel {
    background: #EF5753;
    color: #fff;
}

.btn-cancel:hover {
    background: #E3342F;
    color: #fff;
}

.strikeout {
    text-decoration: line-through;
    color: #B8C2CC;
}

.strikeout:hover {
    color: #8795A1;
}

.priority {
    color: #DE751F;
}

</style>
