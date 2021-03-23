var product = [
    {
        id : 'product-1',
        name : 'papaya',
        type : 'fruit',
        warehouse: 'warehouse-1',
        quantity : 540,
        meassurement : {
            type : 'kg',
        }
    }
]

const generateId = (function(){
    let partID = 'product-'
    return () => {
        let code = Math.floor(Math.random()*10000)
        return `${partID}${code}`
    }
})()

var user = [
    {
        id : 'user-1',
        fullname : 'erick manolo',
        email : 'erock@gmail.com',
        username : 'pepepe',
        password : 'apass1',
        auth : {
            position : 'manager'
        }
    }
]

var typeProduct = [
    {
        id : 1,
        name : 'fruit'
    },
    {
        id : 2,
        name : 'vegettables'
    },
    {
        id : 3,
        name : 'tuberculous'
    },
    {
        id : 4,
        name : 'cookies'
    },
]

var orders = [

]

var client = [
    {
        id : 'client-1',
        name : 'client number1',
        RUC : '46565465456',
        directions : [
            {
                type : 'main',
                direction : '150515'
            }
        ],
        contacts : [
            {
                name : 'alonsito',
                email : 'alonsito@gmail.com',
                phone : '4562123'
            }
        ]
    }
]