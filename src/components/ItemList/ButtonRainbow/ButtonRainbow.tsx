"use client"
import ButtonRainbowIcon from "@/src/components/Icons/ButtonRainbowIcon"
import CheckedBoxRainbow from "@/src/components/Icons/CheckedBoxRainbow"
import { useState } from "react"

type ButtonRainbowProps = {
    checked: boolean
}
export const ButtonRainbow = ({ checked }: ButtonRainbowProps) => {
    const [isChecked, setIsChecked] = useState(checked);
    if(isChecked) {
        return <CheckedBoxRainbow onClick={() => setIsChecked(!isChecked)} className="hover:cursor-pointer"/>
    }
    return <ButtonRainbowIcon onClick={() => setIsChecked(!isChecked)} className="hover:cursor-pointer" />
}


