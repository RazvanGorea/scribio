import { useEffect, useLayoutEffect } from "react";

const isClientSide = typeof window !== "undefined";
export default isClientSide ? useLayoutEffect : useEffect;
