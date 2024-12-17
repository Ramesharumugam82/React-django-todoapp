from django.urls import path
from .views import SignupView, LoginView, todo_list, todo_detail

urlpatterns = [
    path('todos/', todo_list, name='todo-list'),        # GET and POST
    path('todos/<int:pk>/', todo_detail, name='todo-detail'),  # GET, PUT, DELETE
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]