"use client";
import { useEffect, useState } from "react";

export default function PasswordStrengthChecker({ password, className = "" }: { password: string; className?: string }) {
  const [passStrength, setPassStrength] = useState<string>("empty");
  const [passStrengthIndex, setPassStrengthIndex] = useState<number>(0);

  const strengthColors: DataObject = {
    invalid: "bg-gray-100",
    empty: "bg-gray-100",
    too_short: "bg-red-600",
    weak: "bg-yellow-600",
    good: "bg-blue-600",
    strong: "bg-green-400",
    very_strong: "bg-purple-600"
  };
  useEffect(passwordStrength, [password]);

  function passwordStrength() {
    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      setPassStrength("empty");
    } else if (/\s/.test(trimmedPassword)) {
      setPassStrength("invalid");
    } else if (trimmedPassword.length < 8) {
      setPassStrength("too_short");
      setPassStrengthIndex(1);
    } else {
      const types = [/[a-z]/, /[A-Z]/, /\d/, /[!@#$%^&*()=_+[\]{}|;:'",.<>/?`~-]/];
      const trueCount = types.filter(type => type.test(trimmedPassword)).length;

      if (trimmedPassword.length >= 14 && trueCount === 4) {
        setPassStrength("very_strong");
        setPassStrengthIndex(5);
      } else if (trimmedPassword.length >= 12 && trueCount === 3) {
        setPassStrength("strong");
        setPassStrengthIndex(4);
      } else if (trimmedPassword.length >= 8) {
        if (trueCount >= 2) {
          setPassStrength("good");
          setPassStrengthIndex(3);
        } else {
          setPassStrength("weak");
          setPassStrengthIndex(2);
        }
      } else {
        setPassStrength("invalid");
        setPassStrengthIndex(0);
      }
    }
  }

  return (
    <div className={`w-full${" " + className}`}>
      <div className="flex items-center gap-1 mt-[5px] m-w-full">
        {[1, 2, 3, 4, 5].map(index => (
          <div key={index} className={`w-full h-[2px] ${index <= passStrengthIndex ? strengthColors[passStrength] : strengthColors.empty}`}></div>
        ))}
      </div>
      <p className="mt-1 text-sm text-right text-gray-400">{passStrength.replace("_", " ")}</p>
    </div>
  );
}
