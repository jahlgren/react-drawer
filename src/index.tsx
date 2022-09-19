import React from 'react';
import { MouseEvent, useEffect, useRef, useState } from 'react';

type DrawerProps = {
  open               : boolean
  children           ?: any,
  width              ?: string|number,
  transitionDuration ?: number,
  onClose            ?: () => void
}

type DrawerState = 'open'|'opening'|'closed'|'closing';

const hiddenStyle: React.CSSProperties = {position: 'absolute', width: 0, height: 0, overflow: 'hidden'};

const Drawer: React.FC<DrawerProps> = ({
  open,
  children,
  width = 300,
  transitionDuration = 180,
  onClose
}) => {
  
  const [state, setState] = useState<DrawerState>(open ? 'open' : 'closed');
  const openOrOpeing = state === 'open' || state === 'opening';
  const startFocusRef = useRef<HTMLDivElement>(null);
  const endFocusRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(state !== 'open') return;
    startFocusRef.current!.focus(); 
  }, []);

  useEffect(() => {
    let timeout: any;
    switch(state) {
      // Transitions won't run if we change display and other css properties
      // at the same time. First we need to change display and later the rest.
      case 'open'   : !open && (timeout = setTimeout(triggerClose, 1)); break;
      case 'closed' :  open && (timeout = setTimeout(triggerOpen,  1));  break;
      case 'opening': 
      case 'closing': timeout = setTimeout(onTransitionEnd, transitionDuration); break;
    }
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.overflow = openOrOpeing ? 'hidden' : '';
    document.body.style.width    = openOrOpeing ? `calc(100% - ${scrollbarWidth}px)` : '';
    return timeout ? () => clearTimeout(timeout) : undefined;
  }, [open, state]);
  
  const triggerOpen = () => {
    setState('opening');
    startFocusRef.current!.focus();
  }

  const triggerClose = () => {
    setState('closing');
  }

  const onTransitionEnd = () => {
    if     (state === 'opening') setState('open');
    else if(state === 'closing') setState('closed');
  }

  const onMaskClicked = (e: MouseEvent) => {
    e.stopPropagation();
    onClose && onClose();
  }

  return (
    <div 
      className="ja-rc-drawer-container"
      style={{ display: (state === 'closed' && !open) ? 'none' : undefined }}
      tabIndex={-1}
    >
      <div 
        className="ja-rc-drawer-mask"
        onClick={onMaskClicked} 
        style={{
          opacity: openOrOpeing ? 1 : 0,
          transition: `opacity ${transitionDuration/1000}s cubic-bezier(.25, 0, .75, 1)`,
        }}
      />
      <div aria-hidden tabIndex={0} style={hiddenStyle} onFocus={() => endFocusRef.current!.focus()} />
      <div ref={startFocusRef} aria-hidden tabIndex={0} style={hiddenStyle} />
      <div 
        role="dialog"
        aria-modal
        className={"ja-rc-drawer"}
        style={{
          width,
          transform: openOrOpeing ? 'translateX(0)' : 'translateX(-100%)',
          transition: `transform ${transitionDuration/1000}s cubic-bezier(.25, 0, .75, 1)`,
        }}
      >
        {children}
      </div>
      <div ref={endFocusRef} aria-hidden tabIndex={0} style={hiddenStyle} />
      <div aria-hidden tabIndex={0} style={hiddenStyle} onFocus={() => startFocusRef.current!.focus()} />
    </div>
  );
}

export default Drawer;
