document.addEventListener('DOMContentLoaded', function () {
           
    const editButton = document.getElementById('edit');
    editButton.addEventListener('click', async function (event) {
      event.preventDefault();

      const userId = getUserIdFromSomeWhere();
      const name = document.getElementById('username').value;
      const userid = document.getElementById('userid').value;
      const hp = document.getElementById('hp').value;
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzEwZGU1MGIzZDk2NjUxZTIwYmZmYSIsImlhdCI6MTcwMTkxMDY4MiwiZXhwIjoxNzAyMDgzNDgyfQ.U2iJsrPLJl2QMQ66CN6J-ehLLcUoElcp96yCT_hb98o'; // 토큰값

      try {
        const response = await fetch('http://localhost:8080/auth/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // // 토큰추가
          },
          body: JSON.stringify({ userid, name, userid, hp }),  // body에 새 값 추가
        });

        const result = await response.text();
        alert(result);
      } catch (error) {
        console.error('Error updating user:', error.message);
      }
    });

    
    function getUserIdFromSomeWhere() {
      // 현재 URL에서 userId 파라미터 가져오기
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('userid');
    }
  });