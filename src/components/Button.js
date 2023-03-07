import React from 'react'

function Button({variant, children}) {
  const classes = "btn " + `btn--${variant ?? "primary"}`
  return (
    <button className={classes}>
      {children}
    </button>
  )
}

export default Button
