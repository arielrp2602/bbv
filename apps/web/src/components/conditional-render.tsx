type ConditionalRenderProps = {
  flag: boolean;
  whenTrue: React.ReactNode;
  whenFalse: React.ReactNode;
};

export function ConditionalRender({ flag, whenTrue, whenFalse }: ConditionalRenderProps) {
  return flag ? <>{whenTrue}</> : <>{whenFalse}</>;
}
