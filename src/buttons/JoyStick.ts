import { joystick } from '@/utils/tcg-sdk/plugin';

class JoyStick {
  static show: boolean = false;

  static init() {
    if (JoyStick.show) {
      let joystickEle: any = document.createElement('div');
      joystickEle.id = 'game-joystick';
      joystickEle.style = 'position: relative;width:100px;height:100px;pointer-events:auto;';

      let bottomElement: any = document.getElementById('bottom-area');
      bottomElement.appendChild(joystickEle);

      setTimeout(() => {
        const x = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
        const j = joystick.create({
          sendData: true,
          // @ts-ignore
          zone: document.querySelector('#game-joystick'),
          size: x > 1920 ? 200 : 100,
          type: 'dpad_wasd',
          position: {
            top: x > 1920 ? 120 : 50,
            left: x > 1920 ? 120 : 50,
          },
        });
        j.on('move', (data) => {
          //
        });
      }, 1000);
    }
  }
}

export default JoyStick;
