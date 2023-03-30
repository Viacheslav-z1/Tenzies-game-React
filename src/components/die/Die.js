import './die.scss'


function Die(props) {
  return (
    <div
      onClick={() => props.holdDice()}
      className={props.isHeld ? "die green" : "die"}
    >
      {props.value}
    </div>
  );
}

export default Die;