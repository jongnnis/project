// 본인인증 팝업창 열기 (아; 근데 앱이면 필요없겠다)
function openPopup(){
    const expNameText = /^(?:[가-힣]{1,20}|[A-Za-z]{1,20})$/
    const expSsn1Text = /^\d{6}$/
    const expSsn2Text = /^\d{7}$/
    const expHpText = /^\d{11}$/

    if (!expNameText.test(document.getElementById('name').value)){
        alert('이름을 올바르게 작성하세요.')
        return false
    }
    else if (!expSsn1Text.test(document.getElementById('ssn1').value)){
        alert('주민등록 번호가 올바르지 않습니다')
        return false
    }
    else if (!expSsn2Text.test(document.getElementById('ssn2').value)){
        alert('주민등록 번호가 올바르지 않습니다')
        return false
    }
    else if (!expHpText.test(document.getElementById('hp').value)){
        alert('하이픈(-)을 제외한 전화번호 11자리를 올바르게 입력하세요')
        return false
    }
    const data = {
        name : document.getElementById('name').value,
        ssn1 : document.getElementById('ssn1').value,
        ssn2 : document.getElementById('ssn2').value,
        hp : document.getElementById('hp').value
    }
    localStorage.setItem("userInfo",JSON.stringify(data))
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
    
    // 정규표현식 확인
    if (checkAll()) {
        // 데이터 전송
        const formData = {
            userid: userid,
            userpw: userpw,
            name: name,
            ssn1: ssn1,
            ssn2: ssn2,
            hp: hp
        }
        console.log(formData)
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
    }
})

// 정규 표현식 확인 함수
function checkAll(){
    const userid = document.getElementById('userid')
    const userpw = document.getElementById('userpw')
    const userpw_re = document.getElementById('userpw_re')
    const name = document.getElementById('name')
    const ssn1 = document.getElementById('ssn1')
    const ssn2 = document.getElementById('ssn2')
    const hp = document.getElementById('hp')

    // 정규 표현식
    const expIdText = /^[A-Za-z0-9]{5,15}$/
    const expPwText = /^(?=.*[A-Za-z])(?=.*[~!@#$%^*+=-])(?=.*[0-9])\S{5,20}$/
    const expPw_reText = /^(?=.*[A-Za-z])(?=.*[~!@#$%^*+=-])(?=.*[0-9])\S{5,20}$/
    const expNameText = /^(?:[가-힣]{1,20}|[A-Za-z]{1,20})$/
    const expSsn1Text = /^\d{6}$/
    const expSsn2Text = /^\d{7}$/
    const expHpText = /^\d{11}$/

    if (!expIdText.test(userid.value)){
        alert('아이디는 5자 이상 15자 이하의 영문자 또는 숫자로 입력하세요')
        userid.focus()
        return false
    }
    else if (!expPwText.test(userpw.value)){
        alert('비밀번호는 5자 이상 20자 이하의 영문자, 숫자, 특수기호(~!@#$%^*+=-)의 조합으로 입력하세요')
        userpw.focus()
        return false
    }
    else if (userpw_re.value !== userpw.value){
        alert('비밀번호가 일치하지 않습니다.')
        userpw_re.focus()
        return false
    }
    else if (!expNameText.test(name.value)){
        alert('이름을 올바르게 작성하세요.')
        name.focus()
        return false
    }
    else if (!expSsn1Text.test(ssn1.value)){
        alert('주민등록 번호가 올바르지 않습니다')
        ssn1.focus()
        return false
    }
    else if (!expSsn2Text.test(ssn2.value)){
        alert('주민등록 번호가 올바르지 않습니다')
        ssn2.focus()
        return false
    }
    else if (!expHpText.test(hp.value)){
        alert('하이픈(-)을 제외한 전화번호 11자리를 올바르게 입력하세요')
        hp.focus()
        return false
    }
    // else if (!)
    else{
        return true
    }
}