function logout() {
    firebase.auth().singOut().then(() => {
        window.location.href = "../../index.html";
    }).catch(() => {
        alert('Erro ao fazer logout')
    })
}