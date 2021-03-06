import "../index.css"
import { useCallback, useEffect, useState } from "react";

const COLOR = "COLOR"

function ColorBox() {
  const [color, setColor] = useState("deeppink")

  const getRandomColor = () => {
    var colors = ["red", "black", "blue", "deeppink"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor
  }

  useEffect(() => {
    const getColor = localStorage.getItem(COLOR)
    if (getColor) {
      setColor(getColor)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(COLOR, color)
  }, [color])

  const onClickChangeColor = useCallback(() => {
    const newColor = getRandomColor()
    setColor(newColor)
  }, [color])

  return (
    <div
      className="box"
      style={{ backgroundColor: color }}
      onClick={onClickChangeColor}>
    </div>
  );
}

export default ColorBox;
