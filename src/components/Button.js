import clsx from 'clsx'
import React from 'react'

function Button({variant, children, disabled}) {
  // const classes = "btn " + `btn--${variant ?? "primary"}`
  const classes = clsx({
    "btn": true,
    "btn--primary": true,
    "btn--secondary": variant == "secondary",
    "btn--disabled": disabled
  })
  return (
    <button className={classes}>
      {children}
    </button>
  )
}

export default Button
