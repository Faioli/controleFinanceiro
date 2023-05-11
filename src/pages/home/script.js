function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout')
    })
}

const fakeTransactions = [{
    type: 'expense',
    date: '2023-03-15',
    money: {
        currency: R$,
        value:70
    },
    transactionType: 'Supermercado'
}, {
    type: 'income',
    date: '2023-03-18',
    money: {
        currency: R$,
        value:3000
    },
    transactionType: 'Salário'
}, {
    type: 'expense',
    date: '2023-03-07',
    money: {
        currency: R$,
        value:10
    },
    transactionType: 'Ônibus'
}, {
    type: 'expense',
    date: '2023-03-22',
    money: {
        currency: R$,
        value:1600
    },
    transactionType: 'Aluguel'
}]