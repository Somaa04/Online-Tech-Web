import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const Div = motion.div
const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, className = '', delay = 0, y = 22 }) {
  const reduce = useReducedMotion()
  return (
    <Div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduce ? 0 : 0.55, delay, ease }}
    >
      {children}
    </Div>
  )
}

export function Enter({ children, className = '', delay = 0, x = 0, y = 18 }) {
  const reduce = useReducedMotion()
  return (
    <Div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.55, delay, ease }}
    >
      {children}
    </Div>
  )
}

export function PageTransition({ pageKey, children }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait">
      <Div
        key={pageKey}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: reduce ? 0 : 0.32, ease }}
      >
        {children}
      </Div>
    </AnimatePresence>
  )
}

export function FloatPanel({ open, className = '', children, ...props }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open ? (
        <Div
          key="panel"
          className={className}
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: reduce ? 0 : 0.3, ease }}
          {...props}
        >
          {children}
        </Div>
      ) : null}
    </AnimatePresence>
  )
}

export function ModalShell({ open, onClose, panelClassName = '', children, ...panelProps }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open ? (
        <Div
          key="modal"
          className="no-print fixed inset-0 z-50 grid place-items-center bg-inverse/55 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={onClose}
        >
          <Div
            className={panelClassName}
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.3, ease }}
            onClick={(event) => event.stopPropagation()}
            {...panelProps}
          >
            {children}
          </Div>
        </Div>
      ) : null}
    </AnimatePresence>
  )
}
