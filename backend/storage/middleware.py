class AllowIframeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if request.path.startswith('/api/storage/preview/') or request.path.startswith('/api/storage/public-preview/'):
            response.headers['X-Frame-Options'] = 'ALLOWALL'

        return response