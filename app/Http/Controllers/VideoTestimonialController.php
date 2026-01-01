<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\VideoTestimonial;
use Illuminate\Support\Facades\Storage;

class VideoTestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ManageVideo', [
            'videos' => VideoTestimonial::latest()->get()->map(fn ($v) => [
                'id' => $v->id,
                'name' => $v->name,
                'role' => $v->role,
                'testimonial' => $v->testimonial,
                'rating' => $v->rating,
                'videoUrl' => Storage::url($v->video_path),
                'thumbnail' => $v->thumbnail_path
                    ? Storage::url($v->thumbnail_path)
                    : Storage::url($v->video_path),
                'duration' => $v->duration,
                'uploadDate' => $v->created_at->toDateString(),
                'status' => $v->status,
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'testimonial' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'video' => 'required|file|mimes:mp4,mov,avi,webm|max:512000',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        $videoPath = $request->file('video')->store('videos', 'public');
        $thumbnailPath = $request->file('thumbnail')
            ? $request->file('thumbnail')->store('thumbnails', 'public')
            : null;

        VideoTestimonial::create([
            'name' => $data['name'],
            'role' => $data['role'],
            'testimonial' => $data['testimonial'],
            'rating' => $data['rating'],
            'video_path' => $videoPath,
            'thumbnail_path' => $thumbnailPath,
            'duration' => '2:30', // optional: extract via FFmpeg
            'status' => 'published',
        ]);

        return redirect()->back();
    }

    public function update(Request $request, VideoTestimonial $videoTestimonial)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'testimonial' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'video' => 'nullable|file|mimes:mp4,mov,avi,webm|max:512000',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('video')) {
            Storage::disk('public')->delete($videoTestimonial->video_path);
            $videoTestimonial->video_path = $request->file('video')->store('videos', 'public');
        }

        if ($request->hasFile('thumbnail')) {
            Storage::disk('public')->delete($videoTestimonial->thumbnail_path);
            $videoTestimonial->thumbnail_path = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $videoTestimonial->update($data);

        return redirect()->back();
    }

    public function destroy(VideoTestimonial $videoTestimonial)
    {
        Storage::disk('public')->delete([
            $videoTestimonial->video_path,
            $videoTestimonial->thumbnail_path,
        ]);

        $videoTestimonial->delete();

        return redirect()->back();
    }
}
