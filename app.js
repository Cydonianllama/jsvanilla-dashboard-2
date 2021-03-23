class ProductRepo{

    constructor(repo = []){
        this.repo=repo
    }

    findByPage(page){
        if (page === 0) return []
        let limit = 20
        let current = page - 1
        this.repo.slice(current * limit, (current*limit) + limit)
    }

    findByAttribute(object){
        let report = this.repo.find(data => data.name === object.forSearch)
        return report    
    }

    filter(object){

        const attributesAcepted = ['type','warehouse']

        for(let acepted of attributesAcepted){
            if (acepted === object.concept) {
                return this.repo.filter(data => data[acepted] === object.text)
            }
        }

    }

    find(id){
        if(!id){
            let report = this.repo.slice(0, 20)
            return report
        }else{
            let report = this.repo.find(data => data.id === id)
            return report
        }
    }

    create(object){
        if(!object) return
        this.repo.push(object)
    }

    update(object){
        if(!object) return
        let newArr = this.repo.map(data => {
            if (data.id === object.id){
                return object
            }else{
                return data
            }
        })
        this.repo=newArr
        console.log('updated',this.repo);
        return object
    }

    delete(id){
        if(!id) return
        let newArr = this.repo.filter(data => data.id !== id)
        this.repo = newArr
        console.log(this.repo);
        return true
    }

}

class UserRepo {

    constructor(repo = []){
        this.repo=repo
    }

    find(id){
        if(!id){
            let report = this.repo.slice(0,20)
            return report
        }else{
            let report = this.repo.find(data => data.id === id)
            return report
        }
    }

}

class OrderRepo{

    constructor(repo = []){
        this.repo=repo
    }

    create(object){
        this.repo.push(object)
    }

    find(id){
        if (!id){
            let report = this.repo.slice(0,20)
            return report
        }else{
            let report = this.repo.find(data => data.id === id)
            return report
        }
    }

}

const productRepository = new ProductRepo(product)
const userRepository = new UserRepo()
const orderRepository = new OrderRepo()

class OrderService {
    
    constructor(){

    }

    process(object){

    }

    save(object){

    }

}

class ProductService {
    
    constructor(){

    }

    createProduct(object){
        return productRepository.create(object)
    }

    deleteProduct(id){
        return productRepository.delete(id)
    }

    updateProduct(object){
        return productRepository.update(object)
    }

    getProduct(id){
        return productRepository.find(id)
    }

    getProducts(){
        return productRepository.find()
    }

    getProductByPagination(pag){

    }

    getProductByAttribute(object){
        return productRepository.findByAttribute(object)
    }

    getProductsFilter(object){
        return productRepository.filter(object)
    }
}

const productService = new ProductService()
const orderService = new OrderService()

const UserState = {
    userInfo : {

    }
}

const ProductState = {
    productsTable : [],
    productTableComponent : null,
    bindProductTable(table){
        this.productTableComponent = table
    },
    getProducts(){
        let report =  productService.getProducts()
        this.productsTable = report
    },
    createProduct(object){
        return productService.createProduct(object)
    },
    updateProduct(object){
        return productService.updateProduct(object)
    },
    deleteProduct(id){
        return productService.deleteProduct(id)
    },
    filterProducts(object){
        let report = productService.getProductsFilter(object)
        console.log('report',report);
    },
    searchProduct(object){
        let report = productService.getProductByAttribute(object)
        console.log(report);
    },
    productInModalEdit : {
        data : {

        },
        populateData : function(id){
            let report = productService.getProduct(id)
            this.data = report
            return this.data
        }
    },
}

const OrderState = {
    currentOrder : {
        productsSelected : []
    }
}

const HintState = {
    messages : [],
    hintComponent : null,
    resetMessages(){
        this.messages = []
    },
    pushMessage(data){
        this.messages.push(data)
    },
    setHintComponent(hint){
        this.hintComponent = hint
    },
    updateHintMessages(){
        this.hintComponent.updateComponent(this.messages)
    }
}


const HINT_CONTEXT = 'HINT_CONTEXT'
const USER_CONTEXT = 'USER_CONTEXT'
const PRODUCT_CONTEXT = 'PRODUCT_CONTEXT'
const ORDER_CONTEXT = 'ORDER_CONTEXT'

const stateContext = (type) => {
    switch(type){
        case USER_CONTEXT:
            return UserState
        case PRODUCT_CONTEXT:
            return ProductState
        case ORDER_CONTEXT:
            return OrderState
        case HINT_CONTEXT:
            return HintState
    }
}

class HintItem {

    constructor(){

    }

    listeners(){
        const component = this.currentComponent
        
        const btnRemove = component.querySelector('.hint-item-remove')
        btnRemove.addEventListener('click',(e)=>{
            component.remove()   
            delete this 
            e.preventDefault()
        })

    }

    getTemplate(){
        let div = document.createElement('div')
        const {status,msg} = this.data
        let template = `
            <div class = "hint-item-message" >
                <span>${msg}</span>
            </div>
            <div class = "hint-item-actions">
                <button class = "hint-item-remove" >X</button>
            <div>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()

        setTimeout(() => {
            if(!this) return 
            this.currentComponent.remove()
            delete this
        },2500)
    }

    setData(data){
        this.data = data
    }

}

class Hint {

    constructor(){

    }

    listeners(){

    }

    updateComponent(msgs = []){
        const hintContainer = document.getElementById('hints')
        msgs.forEach(data => {
            let component = new HintItem()
            component.setData(data)
            component.render(hintContainer)
        })
    }

    getTemplate(){
        let div = document.createElement('div')
        div.id = 'hints'
        let template = ``
        div.innerHTML = template
        return div
    }
    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

const modalUtils = {
    contentDashboard: () => document.querySelector('.content-dashboard'),
    contaniner: () => document.querySelector('.modals'),
    openModal : function(modal){
        if (modal.classList.contains('modal-close')){
            modal.classList.add('modal-open')
            modal.classList.remove('modal-close')
            this.contaniner().style.zIndex = '1'
            this.contentDashboard().style.filter = 'blur(1.1px)'
        }
    },
    closeModal : function(modal){
        if (modal.classList.contains('modal-open')){
            modal.classList.add('modal-close')
            modal.classList.remove('modal-open')
            this.contaniner().style.zIndex = '-1'
            this.contentDashboard().style.filter = 'blur(0px)'
        }
    }
}

class ModalProcessOrder {

    constructor(){

    }

    listeners(){

        const component = this.currentComponent

        const btnCancel = component.querySelector('.btn-cancel-modal')
        btnCancel.addEventListener('click', () => {
            modalUtils.closeModal(component)
        })

        const btnProcess = component.querySelector('.btn-process-order')
        btnProcess.addEventListener('click',()=> {
            modalUtils.closeModal(component)
        })

        const btnSave = component.querySelector('.btn-save-modal')
        btnSave.addEventListener('click',() => {

        })
    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('modal')
        div.classList.add('modal-close')
        let template = `
            <button class = "btn-cancel-modal">
                cancel
            </button>
            <button class = "btn-save-modal">
                save
            </button>
            <button class = "btn-process-order" >
                process
            <button>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

class ModalDeleteProduct {

    constructor() {

    }

    updateDataModal(data){
        this.model = data
        this.id = data.data.id
    }

    listeners() {

        const component = this.currentComponent
        const context = stateContext(PRODUCT_CONTEXT)
        const hintContext = stateContext(HINT_CONTEXT)

        const btnCancel = component.querySelector('.btn-cancel-modal-delete')
        btnCancel.addEventListener('click',()=>{
            modalUtils.closeModal(component)
        })

        const btnDelete = component.querySelector('.btn-delete-modal-delete')
        btnDelete.addEventListener('click',()=>{

            context.deleteProduct(this.id)

            hintContext.pushMessage({ status: 'success', msg: `product ${this.model.data.name} deleted ` })
            hintContext.updateHintMessages()
            hintContext.resetMessages()

            this.model.currentComponent.remove()
            delete this.model.currentComponent

            modalUtils.closeModal(component)
            
        })
    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('modal')
        div.classList.add('modal-close')
        let template = `
            <form>
                <h2>Delete Product</h2>
                <label for = "input-delete-form-token" >Token</label>
                <input name = "input-delete-form-token" type = "text" placeholder = "token auth" />
                <button>validate token</button>
                <span>need validate token</span>
                <button type = "button" class = "btn-cancel-modal-delete" >
                    cancel
                </button>
                <button type = "button" class = "btn-delete-modal-delete" >
                    delete
                </button>
            </form>
            
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

class ModalEditProduct {

    constructor(){

    }

    updateDataModal(data){
        
        const setDataToForm = (form,data) => {

            const {
                id,
                name,
                type,
                warehouse,
                quantity,
                meassurement
            } = data

            form['input-form-edit-product-name'].value = name
            form['form-edit-product-type'].value = type
            form['form-edit-product-warehouse'].value = warehouse
            form['form-edit-product-quantity'].value = quantity.toString()
            form['form-edit-product-meassuerment'].value = meassurement.type

            this.currentId = id
            
        }

        this.currentRowProduct = data
        
        const context = stateContext(PRODUCT_CONTEXT)
        let data_currentproduct = context.productInModalEdit.populateData(data.data.id)
        const form = this.form
        setDataToForm(form, data_currentproduct)

    }

    listeners(){

        const component = this.currentComponent
        const formEditProduct = document.forms['form-edit-product']
        this.form = formEditProduct

        const context = stateContext(PRODUCT_CONTEXT)
        const hintContext = stateContext(HINT_CONTEXT)

        const btnCancel = component.querySelector('.btn-cancel-modal-edit-product')
        btnCancel.addEventListener('click',()=>{
            modalUtils.closeModal(component)
        })

        const btnEdit = component.querySelector('.btn-edit-modal-edit-product')
        btnEdit.addEventListener('click',()=> {
            const formEditProduct = document.forms['form-edit-product']
            const data = {
                id: this.currentId,
                name: formEditProduct['input-form-edit-product-name'].value,
                type: formEditProduct['form-edit-product-type'].value,
                warehouse: formEditProduct['form-edit-product-warehouse'].value,
                quantity: parseFloat(formEditProduct['form-edit-product-quantity'].value),
                meassurement: {
                    type: formEditProduct['form-edit-product-meassuerment'].value,
                }
            }
            context.updateProduct(data)
            this.currentRowProduct.setData(data)
            this.currentRowProduct.updateComponent()
            modalUtils.closeModal(component)

            hintContext.pushMessage({ status: 'success', msg: `product ${data.name} edited ` })
            hintContext.updateHintMessages()
            hintContext.resetMessages()

        })

    }

    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('modal')
        div.classList.add('modal-close')
        let template = `
            <form id = "form-edit-product" >
                <h2>Edit Product</h2>
                <label for = "input-form-edit-product-name" >Name</label>
                <input name = "input-form-edit-product-name" type = "text" placeholder = "name" />
                <label for ="form-edit-product-type" >Type</label>
                <select id = "form-edit-product-type">
                    <option>fruit</option>
                    <option>vegetables</option>
                    <option>cookies</option>
                    <option>tuberculous</option>
                </select>
                <label for ="form-edit-product-meassuerment" >Medida</label>
                <select id = "form-edit-product-meassuerment" >
                    <option>kg</option>
                    <option>lt</option>
                    <option>unit</option>
                </select>
                <input name = "form-edit-product-quantity" type ="number" placeholder = "quantity" />
                <label for ="form-edit-product-warehouse" >Warehouse</label>
                <select id = "form-edit-product-warehouse">
                    <option>warehouse-1</option>
                    <option>warehouse-2</option>
                    <option>warehouse-3</option>
                    <option>warehouse-4</option>
                </select>
                <button type = "button" class = "btn-cancel-modal-edit-product" >
                    cancel
                </button>
                <button type  = "button" class = "btn-edit-modal-edit-product" >
                    edit
                </button>
            </form>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

class ModalCreateProduct {

    constructor(){

    }

    setTableProduct(table){
        this.table = table
    }

    listeners(){
        const component = this.currentComponent
        const context = stateContext(PRODUCT_CONTEXT)
        const hintContext = stateContext(HINT_CONTEXT)
        
        const formCreateProduct = document.forms['modal-create-product']

        const btnCancel = component.querySelector('.btn-cancel-modal-create-product')
        btnCancel.addEventListener('click',()=> {
            modalUtils.closeModal(component)
        })

        const btnCreate = component.querySelector('.btn-create-modal-create-product')
        btnCreate.addEventListener('click',()=>{

            const data = {
                id: generateId(),
                name: formCreateProduct['input-form-create-product-name'].value,
                type: formCreateProduct['form-create-product-type'].value,
                warehouse: formCreateProduct['form-create-product-warehouse'].value,
                quantity: parseFloat(formCreateProduct['quantity-create-product'].value),
                meassurement: {
                    type: formCreateProduct['form-create-product-meassuerment'].value,
                }
            }
            
            context.createProduct(data)
            this.table.addProduct(data)
            formCreateProduct.reset()
            modalUtils.closeModal(component)

            hintContext.pushMessage({status : 'success' , msg : `product ${data.name} added `})
            hintContext.updateHintMessages()
            hintContext.resetMessages()
        
        })

    }
    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('modal')
        div.classList.add('modal-close')
        let template = `
            <form id = "modal-create-product">
                <h2>Create Product</h2>
                <label for = "input-form-create-product-name" >Name</label>
                <input name = "input-form-create-product-name" type = "text" placeholder = "name" />
                <label for ="form-create-product-type" >Type</label>
                <select id = "form-create-product-type">
                    <option>fruit</option>
                    <option>vegetables</option>
                    <option>cookies</option>
                    <option>tuberculous</option>
                </select>
                <label for ="form-create-product-meassuerment" >Medida</label>
                <select id = "form-create-product-meassuerment" >
                    <option>kg</option>
                    <option>lt</option>
                    <option>unit</option>
                </select>
                <input name = "quantity-create-product" type ="number" placeholder = "quantity" />
                <label for ="form-create-product-warehouse" >Warehouse</label>
                <select id = "form-create-product-warehouse">
                    <option>warehouse-1</option>
                    <option>warehouse-2</option>
                    <option>warehouse-3</option>
                    <option>warehouse-4</option>
                </select>
                <button type = "button" class = "btn-cancel-modal-create-product" >
                    cancel
                </button>
                <button type = "button" class = "btn-create-modal-create-product" >
                    create
                </button>
            </form>
        `
        div.innerHTML = template
        this.currentComponent = div
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

class ActionsTableProduct {

    constructor() {

    }

    listeners(){

        const formSearch = document.forms['form-search']
        const formFilter = document.forms['form-filter']

        const productContext = stateContext(PRODUCT_CONTEXT)

        const btnFormFilterSearch = document.getElementById('btn-form-filter-product')
        btnFormFilterSearch.addEventListener('click',(e)=>{
            let dataFilter = {
                concept : null,
                text : null
            }
            formFilter['filter-by'].forEach(input => {
                if (input.checked) {
                    dataFilter.concept = input.value
                }
            })
            const inputRadioValue = formFilter['input-radio-filter'].value
            dataFilter.text = inputRadioValue
            productContext.filterProducts(dataFilter)
            e.preventDefault()
        })
        const btnFormSearchSearch = document.getElementById('btn-form-search-product')
        btnFormSearchSearch.addEventListener('click',(e)=>{
            let dataSearch = {
                forSearch : null
            }
            const inputForSearchValue = formSearch['form-search-name'].value
            dataSearch.forSearch = inputForSearchValue
            productContext.searchProduct(dataSearch)
            e.preventDefault()
        })
    }

    getTemplate(){
        let div = document.createElement('div')
        div.style.display = "flex"
        let template = `

            <form id = "form-filter" >
                <input name = "filter-by" type = "radio" value = "type"/>
                <label for = "filter-by" >type</label>
                <input name = "filter-by" type = "radio"  value = "warehouse"/>
                <label for = "filter-by" >warehouse</label>
                <input name = "input-radio-filter" type = "text" placeholder = "search"/>
                <button id = "btn-form-filter-product" type = "button" >search</button>
            </form>

            <form id  = "form-search" >
                <input name = "form-search-name" type = "text" placeholder = "type name product" />
                <button id = "btn-form-search-product" type = "button" >search</button>
            </form>
            
        `
        div.innerHTML = template
        return div
    }
    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

class RowProduct {

    constructor() {
        this.observers=[]
    }

    setModalEdit(modal){
        this.modalEdit = modal
    }

    notifyModalEdit(){
        this.modalEdit.updateDataModal(this)
    }

    setModalDelete(modal){
        this.modalDelete = modal
    }

    notifyModalDelete(){
        this.modalDelete.updateDataModal(this)
    }

    updateComponent(){
        const component = this.currentComponent
        
        const nameProduct = component.querySelector('.product-row-name')
        const typeProduct = component.querySelector('.product-row-type')
        const warehouseProduct = component.querySelector('.product-row-warehouse')
        const meassurementProduct = component.querySelector('.product-row-meassurement')

        const {
            name,
            type,
            warehouse,
            quantity,
            meassurement
        } = this.data

        nameProduct.innerText = name
        typeProduct.innerText = type
        warehouseProduct.innerText = warehouse
        meassurementProduct.innerText = `${quantity} ${meassurement.type}`
    }

    listeners() {

        const component = this.currentComponent

        const hintContext = stateContext(HINT_CONTEXT)
        
        const selectOrder = component.querySelector('.product-row-select-order')
        selectOrder.addEventListener('click',()=> {
            console.log(selectOrder.checked);
            if (selectOrder.checked){
                hintContext.pushMessage({ status: 'success', msg: `product ${this.data.name} added in order` })
                hintContext.updateHintMessages()
                hintContext.resetMessages()
            }else{
                hintContext.pushMessage({ status: 'success', msg: `product ${this.data.name} removed in order` })
                hintContext.updateHintMessages()
                hintContext.resetMessages()
            }  
        })

        const btnEdit = component.querySelector('.btn-tr-product-edit')
        btnEdit.addEventListener('click',()=>{
            modalUtils.openModal(this.modalEdit.currentComponent)
            this.notifyModalEdit()
        })

        const btnDelete = component.querySelector('.btn-tr-product-delete')
        btnDelete.addEventListener('click',()=>{
            modalUtils.openModal(this.modalDelete.currentComponent)
            this.notifyModalDelete()
        })
    }

    getTemplate() {
        let tr = document.createElement('tr')
        const {
            id,
            name,
            type,
            warehouse,
            quantity,
            meassurement
        } = this.data
        let template = `
            <td>  <input class = "product-row-select-order" type = "checkbox"/> </td>
            <td class = "product-row-name" >${name}</td>
            <td class = "product-row-type" >${type}</td>
            <td class = "product-row-warehouse" >${warehouse}</td>
            <td class = "product-row-meassurement" >${quantity} ${meassurement.type}</td>
            <td>
                <button class = "btn-tr-product-edit" >edit</button>
                <button class = "btn-tr-product-delete" >delete</button>
            </td>
            `
        tr.innerHTML = template
        this.currentComponent = tr
        return tr
    }

    setData(data) {
        this.data = data
    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

class TableProdudct {

    constructor(){

    }

    listeners(){

    }

    addProduct(data){
        let component = new RowProduct()
        component.setData(data)
        component.render(this.containerRows)
        component.setModalDelete(this.modalDelete)
        component.setModalEdit(this.modalEdit)
        console.log(component);
    }

    setModals(modalEdit,modalDelete){
        this.modalEdit = modalEdit
        this.modalDelete = modalDelete
    }

    getTemplate(){
        let table = document.createElement('table')
        let template = `
            <thead>
                <th>Order</th>
                <th>name product</th>
                <th>type</th>
                <th>warehouse</th>
                <th>quantity</th>
                <th>Actions</th>
            </thead>
            <tbody id = "container-product-row" >
            </tbody>
        `
        table.innerHTML = template
        return table
    }

    render(container){
        
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
        
        
        const containerProductRow = document.getElementById('container-product-row')
        this.containerRows = containerProductRow

        stateContext(PRODUCT_CONTEXT).getProducts()
        let report = stateContext(PRODUCT_CONTEXT).productsTable
        console.log(report);
        report.forEach(data => {
            let component = new RowProduct()
            component.setData(data)
            component.setModalEdit(this.modalEdit)
            component.setModalDelete(this.modalDelete)
            component.render(containerProductRow)
        })

    }

}

class ActionsDashboard {

    constructor(){

    }

    setModalGenerateOrder(modal){
        this.modalGenerateOrder = modal
    }

    setModalAddProduct(modal){
        this.modalAddProduct = modal
    }

    listeners(){
        const btnGenerateOrder = document.getElementById('btn-dashboard-generate-order')
        btnGenerateOrder.addEventListener('click',()=>{
            modalUtils.openModal(this.modalGenerateOrder.currentComponent)
        })
        const btnAddProduct = document.getElementById('btn-dashboard-add-product')
        btnAddProduct.addEventListener('click',()=>{
            modalUtils.openModal(this.modalAddProduct.currentComponent)
        })
    }

    getTemplate(){
        let div = document.createElement('div')
        let template = `
            <button id = "btn-dashboard-generate-order" >
                generate order
            </button>
            <button id = "btn-dashboard-add-product">
                add Product
            </button>
        `
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

class Dashborard {
    constructor(){

    }
    listeners(){

    }
    getTemplate(){
        let div = document.createElement('div')
        div.id = 'dashboard'
        let template = `
            <div class = "content-dashboard">
                <div id = "hint-container" >

                </div>
                <div id = "actions-dashboard">

                </div>
                <div id  = "actions-table-product" >

                </div>
                <div id  = "table-product" >

                </div>
            </div>
            <div class = "modals" >

            </div>
        `
        div.innerHTML = template
        return div
    }
    render(container){
        let component = this.getTemplate()
        container.append(component)
    }
}

const app = () => {

    //hint
    const hint = new Hint()

    const actionsDashboard = new ActionsDashboard()
    const actionsTableProduct = new ActionsTableProduct()
    const tableProduct = new TableProdudct()

    //modals
    const modalCreateProduct = new ModalCreateProduct()
    const modalEditProduct = new ModalEditProduct()
    const modalDeleteProduct = new ModalDeleteProduct()
    const modalProcessOrder = new ModalProcessOrder()

    const container = document.getElementById('root')
    const dashboard = new Dashborard()
    dashboard.render(container)
    const modalsContainer = document.querySelector('.modals')
    modalCreateProduct.render(modalsContainer)
    modalDeleteProduct.render(modalsContainer)
    modalEditProduct.render(modalsContainer)
    modalProcessOrder.render(modalsContainer)
    const hintCotnainer = document.getElementById('hint-container')
    hint.render(hintCotnainer)
    const actionsDashboardContainer = document.getElementById('actions-dashboard')
    actionsDashboard.render(actionsDashboardContainer)
    const tableProductContainer = document.getElementById('table-product')
    tableProduct.setModals(modalEditProduct,modalDeleteProduct)
    tableProduct.render(tableProductContainer)
    const actionsTableProductContainer = document.getElementById('actions-table-product')
    actionsTableProduct.render(actionsTableProductContainer)

    actionsDashboard.setModalAddProduct(modalCreateProduct)
    actionsDashboard.setModalGenerateOrder(modalProcessOrder)

    modalCreateProduct.setTableProduct(tableProduct)

    const HintContext = stateContext(HINT_CONTEXT)
    HintContext.setHintComponent(hint)
    const ProductContext = stateContext(PRODUCT_CONTEXT)
    ProductContext.bindProductTable(tableProduct)

}

app()