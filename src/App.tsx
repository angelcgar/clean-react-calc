import { useEffect, useState } from "react";

const App = () => {
  const [display, setDisplay] = useState<string>("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<"+" | "-" | "*" | "/" | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(false);

  const inputDigit = (d: string) => {
    setDisplay((cur) => {
      if (overwrite) {
        setOverwrite(false);
        return d;
      }
      if (cur === "0") return d;
      if (cur === "Error") return d;
      return cur + d;
    });
  };

  const inputDot = () => {
    setDisplay((cur) => {
      if (overwrite) {
        setOverwrite(false);
        return "0.";
      }
      if (cur.includes(".")) return cur;
      return cur + ".";
    });
  };

  const clearAll = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setOverwrite(false);
  };

  const chooseOp = (nextOp: "+" | "-" | "*" | "/") => {
    const current = parseFloat(display);
    if (overwrite && op !== null) return;
    if (op !== null && prev !== null && !overwrite) return;
    setPrev(current);
    setOp(nextOp);
    setOverwrite(true);
  };

  const compute = (a: number, b: number, operator: "+" | "-" | "*" | "/") => {
    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "*") return a * b;
    if (operator === "/") return b === 0 ? NaN : a / b;
    return b;
  };

  const equals = () => {
    if (op === null || prev === null) return;
    const current = parseFloat(display);
    const result = compute(prev, current, op);
    if (!isFinite(result)) {
      setDisplay("Error");
      setPrev(null);
      setOp(null);
      setOverwrite(true);
      return;
    }
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setOverwrite(true);
  };

  const del = () => {
    setDisplay((cur) => {
      if (overwrite) {
        setOverwrite(false);
        return "0";
      }
      if (cur.length <= 1) return "0";
      return cur.slice(0, -1);
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= "0" && key <= "9") {
        inputDigit(key);
        return;
      }
      if (key === "+" || key === "-" || key === "*" || key === "/") {
        chooseOp(key as "+" | "-" | "*" | "/");
        return;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inputDigit, chooseOp]);

  const Button = ({ children, onClick, variant = "default", ariaLabel, className }: { children: string; onClick: () => void; variant?: "default" | "primary" | "operator" | "danger"; ariaLabel?: string; className?: string; }) => {
    const base = "select-none rounded-lg border border-border text-lg md:text-xl px-4 py-3 md:py-4 font-medium transition-transform duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
    const variants = {
      default: "bg-secondary text-foreground hover:bg-accent",
      primary: "bg-primary text-primary-foreground hover:opacity-90",
      operator: "bg-muted text-foreground hover:bg-accent",
      danger: "bg-destructive text-destructive-foreground hover:opacity-90",
    } as const;
    return (
      <button aria-label={ariaLabel} onClick={onClick} className={`${base} ${variants[variant]} ${className ?? ""}`}>
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <main className="w-full max-w-sm md:max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Calculadora React</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Suma, resta, multiplicación y división</p>
        </header>
        <section aria-label="display" className="mb-4">
          <div className="w-full rounded-xl border border-border bg-card p-4 md:p-5 text-right shadow-sm">
            <div className="text-muted-foreground text-sm">{op ? `${prev ?? ""} ${op}` : ""}</div>
            <div className="text-3xl md:text-4xl font-bold break-words" role="status" aria-live="polite">{display}</div>
          </div>
        </section>
        <section aria-label="teclado">
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            <Button ariaLabel="borrar todo" variant="danger" onClick={clearAll}>AC</Button>
            <Button ariaLabel="borrar dígito" variant="operator" onClick={del}>DEL</Button>
            <Button ariaLabel="dividir" variant="operator" onClick={() => chooseOp("/")}>÷</Button>
            <Button ariaLabel="multiplicar" variant="operator" onClick={() => chooseOp("*")}>×</Button>

            <Button onClick={() => inputDigit("7")}>7</Button>
            <Button onClick={() => inputDigit("8")}>8</Button>
            <Button onClick={() => inputDigit("9")}>9</Button>
            <Button ariaLabel="restar" variant="operator" onClick={() => chooseOp("-")}>−</Button>

            <Button onClick={() => inputDigit("4")}>4</Button>
            <Button onClick={() => inputDigit("5")}>5</Button>
            <Button onClick={() => inputDigit("6")}>6</Button>
            <Button ariaLabel="sumar" variant="operator" onClick={() => chooseOp("+")}>+</Button>

            <Button onClick={() => inputDigit("1")}>1</Button>
            <Button onClick={() => inputDigit("2")}>2</Button>
            <Button onClick={() => inputDigit("3")}>3</Button>
            <Button variant="primary" ariaLabel="igual" onClick={equals}>=</Button>

            <Button className="col-span-2" onClick={() => inputDigit("0")}>0</Button>
            <Button onClick={inputDot}>.</Button>
            <div />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
