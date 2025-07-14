

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .utils import execute_code, get_code_solution

@api_view(['POST'])
@permission_classes([AllowAny])
def run_code(request):
    language = request.data.get("language")
    code = request.data.get("code")
    input_data = request.data.get("input", "")

    if not language or not code:
        return Response({"error": "Both 'language' and 'code' are required."}, status=400)

    result = execute_code(language, code, input_data)
    return Response(result)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def ask_ai(request):
    try:
        prompt = request.data.get("prompt")
        if not prompt:
            return Response({"error": "Prompt is required."}, status=400)

        result = get_code_solution(prompt)

        if result['success']:
            return Response({"response": result['response']})
        else:
            return Response({"error": result['error']}, status=500)

    except Exception as e:
        return Response({"error": f"Server error: {str(e)}"}, status=500)