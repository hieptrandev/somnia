const { exec } = require('child_process');
const inquirer = require('inquirer');

// Danh sách lệnh
const commandList = [
  { label: 'Run Faucet', command: 'npx ts-node app/faucet.ts' },
  { label: 'Run Exchange', command: 'npx ts-node app/exchange.ts' },
  { label: 'Mint Ping Pong', command: 'npx ts-node app/mint-ping-pong.ts' },
  { label: 'Swap Ping to Pong', command: 'npx ts-node app/swap-ping-to-pong.ts' },
  { label: 'Swap Pong to Ping', command: 'npx ts-node app/swap-pong-to-ping.ts' },
  { label: 'Exit', command: 'exit' },
];

// Hàm hiển thị menu
function displayMenu() {
  console.log('Chào mừng đến với Menu Node.js!');
  console.log('Chọn lệnh bằng cách nhập số:');
  commandList.forEach((item, index) => {
    console.log(`${index + 1}. ${item.label}`);
  });
}

// Hàm chạy lệnh
function runCommand(command) {
  if (command === 'exit') {
    console.log('Thoát chương trình...');
    process.exit(0);
  }

  console.log(`Đang chạy: ${command}`);
  const child = exec(command);

  child.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  child.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  child.on('close', (code) => {
    console.log(`Lệnh hoàn tất với mã thoát: ${code}`);
    showMenu();
  });
}

// Hàm xử lý menu
function showMenu() {
  displayMenu(); // Hiển thị menu

  inquirer
    .prompt([
      {
        type: 'input', // Đổi sang input để nhận số
        name: 'choice',
        message: 'Nhập số lệnh (1-6):',
        validate: (input) => {
          const num = parseInt(input);
          if (isNaN(num) || num < 1 || num > commandList.length) {
            return `Vui lòng nhập số từ 1 đến ${commandList.length}`;
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      const choiceIndex = parseInt(answers.choice) - 1; // Chuyển số nhập thành chỉ số mảng
      const selectedCommand = commandList[choiceIndex].command;
      runCommand(selectedCommand);
    })
    .catch((error) => {
      console.error('Lỗi:', error);
      showMenu(); // Quay lại menu nếu có lỗi
    });
}

// Bắt đầu menu
showMenu();