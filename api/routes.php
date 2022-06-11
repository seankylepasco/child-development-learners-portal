<?php
require_once "./config/Connection.php";
require_once "./mainmodule/Get.php";
require_once "./mainmodule/Auth.php";
require_once "./mainmodule/Global.php";

$db = new Connection();
$pdo = $db->connect();
$global = new GlobalMethods($pdo);
$get = new Get($pdo);
$auth = new Auth($pdo);

if (isset($_REQUEST['request'])) {
  $req = explode('/', rtrim($_REQUEST['request'], '/'));
} else {
  $req = array("errorcatcher");
}

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $data = json_decode(file_get_contents("php://input"));
    switch ($req[0]) {

      case 'users':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_users', 'firstname LIKE "%' . $req[1] . '%" OR lastname LIKE "%' . $req[1] . '%" OR email LIKE "%' . $req[1] . '%"'));
        } else {
          echo json_encode($get->get_common('tbl_users'));
        }
        break;

      case 'soe':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_soe'));
        } else {
          echo json_encode($get->get_common('tbl_soe'));
        }
        break;

      case 'reports':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_reports', 'id = ' . $req[1]));
        } else {
          echo json_encode($get->get_common('tbl_reports', ''));
        }
        break;

      case 'classes': // HERE
        if (count($req) > 1) {
          echo json_encode($get->get_query('SELECT * FROM `tbl_users` WHERE type = "student" && year = "' . $req[1] . '"'));
        } else {
          echo json_encode($get->get_query('SELECT * FROM `tbl_users` WHERE type = "student" && year ="' . $req[1] . "'"));
        }
        break;

      case 'archived':  // HERE NEW
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_users', 'type = "archive" AND firstname LIKE "%' . $req[1] . '%" '));
        } else {
          echo json_encode($get->get_common('tbl_users', 'type = "archive" '));
        }
        break;

      case 'delete_report':
        echo json_encode($global->delete('tbl_reports', 'id = ' . $req[1]));
        break;

      case 'scores':
        if (count($req) > 1) {
          echo json_encode($get->get_query('SELECT tbl_completed.*, tbl_users.firstname, tbl_users.lastname, tbl_modules.title, tbl_modules.total_score FROM `tbl_completed` INNER JOIN tbl_users ON tbl_completed.student_id = tbl_users.id LEFT JOIN tbl_modules ON tbl_completed.file_id = tbl_modules.id WHERE firstname LIKE "%' . $req[1] . '%" OR lastname LIKE "%' . $req[1] . '%"'));
        } else {
          echo json_encode($get->get_query('SELECT tbl_completed.*, tbl_users.firstname, tbl_users.lastname, tbl_modules.title, tbl_modules.total_score FROM `tbl_completed` INNER JOIN tbl_users ON tbl_completed.student_id = tbl_users.id LEFT JOIN tbl_modules ON tbl_completed.file_id = tbl_modules.id ORDER BY tbl_completed.student_id DESC'));
        }
        break;

      case 'years':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_year', 'id = ' . $req[1]));
        } else {
          echo json_encode($get->get_query("SELECT * FROM `tbl_year` ORDER BY id DESC"));
        }
        break;

      case 'add_year':
        echo json_encode($global->insert('tbl_year', $data));
        break;

      case 'update_year':
        echo json_encode($global->update('tbl_year', $data));
        break;

      case 'delete_year':
        echo json_encode($global->delete('tbl_year', 'id = ' . $req[1]));
        break;

      case 'suggestions':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_suggestions', 'id = ' . $data));
        } else {
          echo json_encode($get->get_common('tbl_suggestions'));
        }
        break;

      case 'enrollees':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_users', 'id = ' . $req[1]));
        } else {
          echo json_encode($get->get_common('tbl_users', 'type = "enrollee" '));
        }
        break;

      case 'completed_students':
        echo json_encode($get->get_query("SELECT tbl_completed.id, tbl_users.firstname, tbl_users.lastname, tbl_users.img,
        tbl_modules.total_score, tbl_completed.file, tbl_completed.file_name, tbl_completed.score FROM tbl_users
        JOIN tbl_completed ON tbl_users.id = tbl_completed.student_id
        JOIN tbl_modules ON tbl_modules.id = tbl_completed.file_id
        WHERE tbl_modules.id = $req[1] ORDER BY tbl_completed.id  DESC"));
        break;

      case 'students':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_users', 'id = ' . $req[1]));
        } else {
          echo json_encode($get->get_common('tbl_users', 'type = "student" '));
        }
        break;

      case 'search_students':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_users', ' type = "student" AND firstname LIKE "%' . $req[1] . '%" '));
        } else {
          echo json_encode($get->get_common('tbl_users', 'type = "student" '));
        }
        break;

      case 'update_student':
        echo json_encode($global->update('tbl_users', $data));
        break;

      case 'announcements':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_announcements', 'id = ' . $req[1]));
        } else {
          echo json_encode($get->get_common('tbl_announcements'));
        }
        break;

      case 'add_announcement':
        echo json_encode($global->insert('tbl_announcements', $data));
        break;

      case 'update_announcement':
        echo json_encode($global->update('tbl_announcements', $data));
        break;

      case 'delete_announcement':
        echo json_encode($global->delete('tbl_announcements', 'id = ' . $req[1]));
        break;

      case 'teacher_announcements':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_announcements', 'user_id = ' . $req[1]));
        } else {
          echo json_encode($get->get_common('tbl_announcements', 'user_id = ' . $req[1]));
        }
        break;

      case 'modules_teacher':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_modules', 'teacher_id =' . $req[1] . ' ORDER BY id DESC'));
        } else {
          echo json_encode($get->get_common('tbl_modules', 'teacher_id =' . $req[1] . ' ORDER BY id DESC'));
        }
        break;

      case 'modules':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_modules', 'id=' . $req[1]));
        } else {
          echo json_encode($get->get_common('tbl_modules'));
        }
        break;

      case 'add_module':
        echo json_encode($global->insert('tbl_modules', $data));
        break;

      case 'update_module':
        echo json_encode($global->update('tbl_modules', $data));
        break;

      case 'delete_module':
        echo json_encode($global->delete('tbl_modules', 'id = ' . $req[1]));
        break;

      case 'completed':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_completed', 'file_id = ' . $req[1] . ' && student_id = ' . $req[2]));
        } else {
          echo json_encode($get->get_common('tbl_completed'));
        }
        break;

      case 'update_completed':
        echo json_encode($global->update('tbl_completed', $data));
        break;

      case 'add_completed':
        echo json_encode($global->insert('tbl_completed', $data));
        break;

      case 'delete_completed':
        echo json_encode($global->delete('tbl_completed', 'id = ' . $req[1]));
        break;

      case 'register':
        echo json_encode($auth->register($data));
        break;

      case 'login':
        echo json_encode($auth->login($data));
        break;

      case 'forgot':
        echo json_encode($global->insert('tbl_forgot', $data));
        break;

      case 'user':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_users', 'id = ' . $req[1]));
        } else {
          echo json_encode($get->get_common('tbl_users'));
        }
        break;

      case 'user_exists':
        if (count($req) > 1) {
          echo json_encode($get->get_common('tbl_users', "email = '$data->email' "));
        } else {
          echo json_encode($get->get_common('tbl_users', "email = '$data->email' "));
        }
        break;

      case 'send':
        if (count($req) > 1) {
          echo json_encode($global->insert('tbl_reports', $data));
        } else {
          echo json_encode($global->insert('tbl_reports', $data));
        }
        break;

      case 'get_id':
        echo json_encode($get->get_last('tbl_users'));
        break;

      case 'update_user':
        echo json_encode($auth->update_user('tbl_users', $data));
        break;

      case 'delete_user':
        echo json_encode($global->delete('tbl_users', 'id = ' . $req[1]));
        break;

      default:
        echo "request not found";
        break;
    }
    break;

  case 'GET':
    $data = json_decode(file_get_contents("php://input"));
    switch ($req[0]) {

      case 'users':
        echo json_encode($get->get_common('tbl_users'));
        break;

      case 'completed':
        echo json_encode($get->get_common('tbl_completed'));
        break;

      default:
        echo "request not found";
        break;
    }
    break;
}
