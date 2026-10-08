export async function onRequestPost(context: any) {
  try {
    const data = await context.request.json();
    return new Response(JSON.stringify({ success: true, lead: data }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
}
