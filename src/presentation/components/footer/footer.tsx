import type { JSX } from "react/jsx-runtime";
import { memo } from 'react'

function Footer(): JSX.Element {
  return (
    <footer className="bg-primary h-12" />
  )
}

export default memo(Footer);