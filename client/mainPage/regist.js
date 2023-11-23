// 본인인증 팝업창 열기 (아; 근데 앱이면 필요없겠다)
function openPopup(){
    window.open('check.html', '본인인증 페이지', 'width=500, height=600')
}
// 처음으로 돌아가기
function home(){
    window.location.href =  './index.html'
}
// 서버에 회원 정보 보내기 (회원가입 정보 클릭!)
const signUp = document.getElementById('signUp')
signUp.addEventListener('click', (e)=>{

    // 입력 정보 추출
    const userid = document.getElementById('userid').value
    const userpw = document.getElementById('userpw').value
    const name = document.getElementById('name').value
    const ssn1 = document.getElementById('ssn1').value
    const ssn2 = document.getElementById('ssn2').value
    const hp = document.getElementById('hp').value
    // const proof_img = document.getElementById('proof_img').value

    // 정규 표현식
    const expIdText = /^[A-Za-z]+[0-9]*{5,15}$/
    const expPwText = /^(?=.*[A-Za-z])(?=.*[~!@#$%^*+=-])(?=.*[0-9])\S{5,20}$/
    const expPw_reText = /^(?=.*[A-Za-z])(?=.*[~!@#$%^*+=-])(?=.*[0-9])\S{5,20}$/
    const expNameText = /^[가-힣]|[A-Za-z]{1,20}$/
    const expSsn1Text = /^\d{6}$/
    const expSsn2Text = /^\d{7}$/
    const expHpText = /^\d{11}$/

    if (!expIdText.test(userid)){
        alert('아이디는 5자 이상 15자 이하의 영문자로 입력하세요')
    }

    // 데이터 전송
    const formData = {
        userid: userid,
        userpw: userpw,
        name: name,
        ssn1: ssn1,
        ssn2: ssn2,
        hp: hp
    }
    const jsonData = JSON.stringify(formData)
    
    fetch('http://localhost:8080/auth/signup', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(res => res.json())
    .then(data => console.log(data))
})