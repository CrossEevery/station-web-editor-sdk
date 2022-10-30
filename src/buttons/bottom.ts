import JoyStick from './JoyStick';
import Jump from './Jump';

class Bottom {
  static init(showJoyStick: boolean) {
    let bottomElement = document.createElement('div');
    bottomElement.id = 'bottom-area';
    bottomElement.className = 'bottom-area';
    bottomElement.style.display = 'flex';
    bottomElement.style.alignItems = 'center';
    bottomElement.style.justifyContent = 'space-between';
    bottomElement.style.pointerEvents = 'none';
    bottomElement.style.position = 'absolute';
    bottomElement.style.width = '100%';
    bottomElement.style.height = '200px';
    bottomElement.style.bottom = '37px';
    bottomElement.style.padding = '0 100px 0 40px';
    bottomElement.style.boxSizing = 'border-box';

    let stationElement: any = document.getElementById('station-editor');
    stationElement.appendChild(bottomElement);

    JoyStick.show = showJoyStick;
    if (JoyStick.show) {
      JoyStick.init();
    }
  }
}

export default Bottom;
