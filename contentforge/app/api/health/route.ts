export async function GET() {
  return Response.json({
    ok: true,
    service: 'ContentForge',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
