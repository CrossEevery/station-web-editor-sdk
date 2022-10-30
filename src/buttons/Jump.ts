class Jump {
  static show: boolean = false;

  static init() {
    if (Jump.show) {
      let goEle: any = document.createElement('div');
      goEle.id = 'game-go';
      goEle.style =
        'position: absolute;\n' +
        '      bottom: 105px;\n' +
        '      right: -100%;\n' +
        '      display: flex;\n' +
        '      align-items: center;\n' +
        '      justify-content: space-between;\n' +
        '      margin-left: 7px;\n' +
        '      cursor: pointer;';

      let bottomElement: any = document.getElementById('bottom-area');
      bottomElement.appendChild(goEle);
    }
  }
}

export default Jump;
