@extends("layouts.app")
@section('content')
<main>
    <div class="ms-auto me-auto mt-5" style="width: 500px">
    <p>we will send a link to your email, use that link to reset password</p>
    <form action="{{route('forget.password.post)}}" method="POST">
    @csrf
    <div class="mb-3">
        <label class="form-label">Email address</label>
        <input type="email" class="form-control" name="email">

    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</main>
@endsection
