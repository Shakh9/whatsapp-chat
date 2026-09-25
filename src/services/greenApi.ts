interface GreenApiConfig {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
}

interface GreenApiStateResponse {
  stateInstance: string;
}

export async function getInstanceState({
  idInstance,
  apiTokenInstance,
  apiUrl,
}: GreenApiConfig): Promise<GreenApiStateResponse> {
  const response = await fetch(`${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`);

  if (!response.ok) {
    throw new Error('Не удалось получить состояние GREEN-API');
  }

  return response.json();
}
