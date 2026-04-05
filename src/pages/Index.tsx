const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">bibla-op</h1>
        <p className="text-muted-foreground">
          Open Protocol library — see{' '}
          <code className="text-sm bg-muted px-1.5 py-0.5 rounded">src/lib/bibla-op</code>{' '}
          for the npm package.
        </p>
      </div>
    </div>
  );
};

export default Index;
